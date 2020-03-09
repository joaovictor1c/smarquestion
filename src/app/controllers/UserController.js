import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      login: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }

    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (emailExists) {
      return res.status(400).json({ error: 'User email already exists' });
    }
    const loginExists = await User.findOne({
      where: { email: req.body.login },
    });
    if (loginExists) {
      return res.status(400).json({ error: 'User login already exists' });
    }

    const { id, email, login, name, user_type } = await User.create(req.body);

    return res.json({ id, email, login, name, user_type });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      login: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }
    const { email, oldPassword, login } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: 'User email already exists' });
      }
    }
    if (login && login !== user.login) {
      const loginExists = await User.findOne({ where: { login } });
      if (loginExists) {
        return res.status(400).json({ error: 'User login already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password does not match' });
    }
    const { id, name, user_type } = await user.update(req.body);

    return res.json({ id, login, name, user_type, email });
  }
}

export default new UserController();
