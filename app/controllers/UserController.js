
const { User, Account, Order } = require('../../models');
const { sequelize } = require('../../config/db')
const bcrypt = require('bcrypt');
const mailer = require('../../service/mail')
require('dotenv').config()
const jwt = require('jsonwebtoken');
class UserController {
      async getListUsers(req, res, next) {
            const users = await User.findAll();

            if (users) {
                  const success = req.flash('success') || '';
                  res.render('users/page-list-users', { users, success });
            } else {
                  console.log('Not found!');
            }
      }
      async getDetailtUsers(req, res, next) {
            const id = req.params.id;
            const user = await User.findOne({where:{id}});
            const account = await Account.findOne({where:{id : user.accountId} }) ;
            let { gender, status } = user
            gender = (gender === 1) ? 'male' : 'female';
            status = (status === 1) ? 'active' : 'inactive';
            const mail = account.email ;   
            const error = req.flash('error') || '';
            res.render('users/page-detail-users', { user, gender, status, error, user , mail});
      }
      getAddUsers(req, res, next) {

            res.render('users/page-add-users', { error: '', name: '', email: '', phone: '', role: '', status: '', confirmpassword: '', password: '', gender: '' });
      }
      async addUserAccount(req, res, next) {
            let { name, email, phone, role, status, password, gender, address, age } = req.body
            const avatar = req.file;
            const username = email.split('@')[0];
            password = username;
            const Accountexist = await Account.findOne({ where: { email } });
            const phoneUser = await User.findOne({ where: { phone } });
            if (Accountexist ) {
                  const error = 'This Email is existed !'
                  return res.render('users/page-add-users', { error, name, phone, role, status, password, gender,address,age })
            }else if (phoneUser) {
                  const error = 'This Phone is existed !'
                  return res.render('users/page-add-users', { error, name, phone, role, status, password, gender,address,age })
            } else {
                  const timestamp = Date.now();
                  let transaction
                  try {
                        transaction = await sequelize.transaction();
                        const newAccount = await Account.create(
                              {
                                    username: username, email, password: bcrypt.hashSync(password, 10),
                              },
                              { transaction }
                        );
                        await User.create(
                              {
                                    fullname: name, phone, role, address,age,
                                    status, gender, accountId: newAccount.id, avatar: avatar.originalname
                              },
                              { transaction }
                        );

                        await transaction.commit();
                        const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });
                        const confirmationLink = `${process.env.URL}authen/login?timestamp=${timestamp}&token=${token}`;
                        await mailer.sendMail(email, 'Created Account for user (POS)', confirmationLink)
                        return res.redirect('/authen/confirm-mail');
                  } catch (error) {
                        if (transaction) {
                              await transaction.rollback();
                        }
                  }
            }
      }

      async lockUser(req, res, next) {
            const { id } = req.body;
            const user = await User.findByPk(id);
            // console.log(user);
            if (user.lock_status === 0) {
                  user.lock_status = 1;
                  await user.save();
                  return res.redirect('/users/');
            } else {
                  user.lock_status = 0;
                  await user.save();
                  return res.redirect('/users/');
            }

      }
      
}

module.exports = new UserController(); 