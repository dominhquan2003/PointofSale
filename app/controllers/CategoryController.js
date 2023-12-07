const { Category } = require('../../models');


class CategoryController {
      async getListCategories(req, res, next) {
            const categories = await Category.findAll();
            if (categories) {
                  const success = req.flash('success') || ''
                  res.render('categories/page-list-category', { categories, success });
            } else {
                  console.log('Not found!');
            }
      }
      getAddCategories(req, res, next) {
            const error = req.flash('error') || '';
            res.render('categories/page-add-category', { error });
      }
      async getUpdateCategories(req, res, next) {
            const code = req.params.code;
            const category = await Category.findOne(
                  {
                        where: {
                              code: code
                        }
                  });
            const error = req.flash('error') || '';
            res.render('categories/page-update-category', { category, error });
      }

      async updateCategories(req, res, next) {
            const { name, code } = req.body;
            const codeExist = req.params.code
            const categoryCodeExist = await Category.findOne({ where: { code: codeExist } });

            if (categoryCodeExist && codeExist === code) {
                  req.flash('error', 'Code is exist');
                  return res.redirect(`/categories/${categoryCodeExist.code}`);
            } else {
                  req.flash('success', 'Category is successfully updated');
                  categoryCodeExist.name = name;
                  categoryCodeExist.code = code;
                  await categoryCodeExist.save();
                  return res.redirect('/categories/');

            }
      }


      async addCategories(req, res, next) {
            const { name, code } = req.body;
            const file = req.file;
            const codeExist = await Category.findOne({ where: { code: code } });
            if (codeExist) {
                  req.flash('error', 'Code is exist');
                  res.redirect('/categories/add');
            } else {
                  req.flash('success', 'New category is added to list ');
                  await Category.create({ name: name, code: code, image: file.originalname });
                  res.redirect('/categories/');
            }

      }
      async deleteCategories(req, res, next) {
            let { id } = req.body;
            console.log(req.body);
            if (!id) {
                  return res.json({ code: 1, message: 'Code sản phẩm không hợp lệ' });
            }
            await Category.destroy({ where: { id: id } })
            req.flash('success', 'This category is deleted out of the list ');
            return res.json({ code: 0, message: 'Đã xóa sản phẩm thành công' });

      }




}
module.exports = new CategoryController() 