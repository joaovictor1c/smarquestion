import * as Yup from 'yup';
import Nurse from '../models/Nurse';

class NurseController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      coren: Yup.string().required(),
      cpf: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }

    const corenExists = await Nurse.findOne({
      where: { coren: req.body.coren },
    });
    if (corenExists) {
      return res.status(400).json({ error: 'CRM  already exists' });
    }

    const cpfExists = await Nurse.findOne({
      where: { cpf: req.body.cpf },
    });
    if (cpfExists) {
      return res.status(400).json({ error: 'CPF  already exists' });
    }

    const {
      coren,
      name,
      email,
      number_cell,
      date_birth,
      cpf,
      zip_code,
      address,
      district,
    } = await Nurse.create(req.body);

    return res.json({
      coren,
      name,
      email,
      number_cell,
      date_birth,
      cpf,
      zip_code,
      address,
      district,
    });
  }
}

export default new NurseController();
