const bcrypt = require('bcrypt');
const { Account, User } = require('../../models');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mailer = require('../../service/mail')
const { sequelize } = require('../../config/db')
require('dotenv').config()
class AuthenController {
      logout(req, res, next) {
            res.clearCookie('Authorization');
            res.clearCookie('name');
            res.clearCookie('password');
            res.clearCookie('user');
            
            res.redirect('/authen/login')
      }
      async login(req, res, next) {
            const timestamp = req.query.timestamp;
            const token  = req.query.token ; 
            const error = req.flash('error');
            const success = req.flash('success');
            const expirationTime = 1 * 60 * 1000;
            if (token) {
                  res.cookie('tokenCheckLoginMail', token);

            }
            if (Date.now() - timestamp > expirationTime) {
                  const newTimestamp = Date.now();
                  return res.render('authentication/auth-login-expire', { timestamp: newTimestamp, layout: false });
            } else {

                  return res.render('authentication/auth-sign-in', { success, error, layout: false });
            }
      }
      recover(req, res, next) {
            const warning = req.flash('warning') || '';
            return res.render('authentication/auth-recoverpw', { warning, layout: false });
      }
      confirmMail(req, res, next) {
            const email = req.session.email || '';
            res.render('authentication/auth-confirm-mail', { email, layout: false });
      }
      async loginPost(req, res, next) {
            const { name, password, remember } = req.body
            const accountAdmin = await Account.findOne({ where: { username: 'admin' } });
            const account = await Account.findOne({ where: { username: name } });
            if (accountAdmin) {
                  const match = await bcrypt.compare(password, accountAdmin.password);
                  const user = await User.findOne({ where: { accountId: accountAdmin.id } });   
                  if (match && name === 'admin') {
                        const token = jwt.sign({ username: name, role: 'Admin' }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
                        res.cookie('Authorization', `Bearer ${token}`)
                        res.cookie('user', user);

                        return res.redirect('/');
                  }
                  if (account) {
                        const user = await User.findOne({ where: { accountId: account.id } });
                        bcrypt.compare(password, account.password, (bcryptErr, passwordMatch) => {
                              req.session.user = user;
                              if (bcryptErr) {
                                    console.log(bcryptErr);
                                    return res.status(500).send('Internal Server Error');
                              }
                              else if (!passwordMatch) {
                                    req.flash('error', 'Password is not match');
                                    return res.redirect('/authen/login');
                              }
                              
                              else if (remember) {
                                    res.cookie('name', name);
                                    res.cookie('password', password)
                              }
                              else if (user.status === 0 || name === password) {
                                    if (!req.cookies.tokenCheckLoginMail) {
                                      return res.render('error/page-error-inactive-login.hbs', { message: 'New user must be login from a link in your email', layout: false });
                                    }
                                    req.flash('warning', 'If you donot create new password or use default password, you cannot access all function in dashboard ( EXCEPT Log out ).');
                                    res.clearCookie('Authorization');
                                    res.cookie('user', user);
                                    return res.redirect('/');
                              }else if (user.lock_status === 1) {
                                    return res.render('error/page-error-lock.hbs', { message: 'This account is locked !', layout: false });
                              } else {
                                    const token = jwt.sign({ username: name, role: user.role, lock_status : user.lock_status }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });
                                    res.cookie('Authorization', `Bearer ${token}`)
                                    res.cookie('user', user);

                                    return res.redirect('/');
                              }
                        });
                  } else {
                        req.flash('error', 'This account is not existed');
                        return res.redirect('/authen/login');
                  }
            } else {
                  if (name === 'admin' && password === 'admin') {
                        let transaction
                        try {
                              transaction = await sequelize.transaction();
                              const newAccount = await Account.create(
                                    {
                                          username: name, email: 'admin@gmail.com', password: bcrypt.hashSync(password, 10),
                                    },
                                    { transaction }
                              );

                              const user = await User.create(
                                    {
                                          fullname: 'Administrator', phone: 93835034, role: 'Admin', address: '51 Nguyen Huu Tho Q7 TPHCM',
                                          age: 20, status: 1, gender: 1, accountId: newAccount.id, avatar: '1.png'
                                    },
                                    { transaction }
                              );

                              const token = jwt.sign({ username: 'admin', role: 'Admin' }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
                              res.cookie('Authorization', `Bearer ${token}`)
                              res.cookie('user', user);
                              await transaction.commit();
                              return res.redirect('/');
                        } catch (error) {
                              if (transaction) {
                                    await transaction.rollback();
                              }
                        }
                  } else {
                        req.flash('error', 'Check login and password of admin again');
                        return res.redirect('/authen/login');
                  }

            }
      }
      async recoverPost(req, res, next) {
            const { username, password } = req.body
            let resultvalidation = validationResult(req);
            if (resultvalidation.errors.length === 0) {
                  if (username === password) {
                        req.flash('warning', 'Cannot set default password for new password');
                        return res.redirect('/authen/recover');
                  } else {
                        const account = await Account.findOne({ where: { username} });
                        if (account) {
                              const user = await User.findOne({ where: { accountId: account.id } });
                              if (password === account.password) {
                                    req.flash('warning', 'Please donot enter default password')
                                    return res.render('authentication/auth-recoverpw', { layout: false });
                              } else {
                                    account.password = bcrypt.hashSync(password, 10);
                                    user.status = 1;
                                    await account.save();
                                    await user.save();
                                    req.flash('success', 'Creating new password successfully');
                                    return res.redirect('/authen/login');
                              }
                        } else {
                              req.flash('error', 'This account is not existed');
                              return res.redirect('/authen/login');
                        }
                  }
            } else {
                  let mes;
                  const result = resultvalidation.mapped();
                  for (let err in result) {
                        mes = result[err].msg
                        break;
                  }
                  req.flash('warning', mes);
                  return res.redirect('/authen/recover');
            }
      }
      async resendMail(req, res, next) {
            const { id } = req.body;
            const account = await Account.findByPk(id);
            const timestamp = Date.now();
            const token = jwt.sign({ username :account.username}, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });
            const confirmationLink = `${process.env.URL}authen/login?timestamp=${timestamp}&token=${token}`;
            await mailer.sendMail(account.email, 'Created Account for user (POS)', confirmationLink)
      }
      async changePassword(req, res, next) {
            const { cpass, npass, vpass } = req.body;
            const username = req.user.username;
            try {
                  const account = await Account.findOne({ where: { username } });
                  if (npass === vpass) {
                        bcrypt.compare(cpass, account.password, (bcryptErr, passwordMatch) => {
                              if (bcryptErr) {
                                    console.log(bcryptErr);
                                    return res.status(500).send('Internal Server Error');
                              }
                              if (!passwordMatch) {
                                    req.flash('error', 'Your password is incorrect');
                                    return res.redirect('/profile/edit');
                              } else {
                                    account.password = bcrypt.hashSync(npass, 10);
                                    account.save();
                                    req.flash('success', 'Change Passwords successfully');
                                    return res.redirect('/authen/login');
                              }
                        });
                  } else {
                        req.flash('error', 'Verify password do not match with new password');
                        return res.redirect('/profile/edit');
                  }
            } catch (error) {
                  console.error('Error fetching categories:', error);
                  next(error);
            }

      }


}

module.exports = new AuthenController();


