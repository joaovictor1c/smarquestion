import * as Yup from 'yup';
import Doctor from '../models/Doctor';

class DoctorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      crm: Yup.string().required(),
      cpf: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }

    const crmExists = await Doctor.findOne({
      where: { crm: req.body.crm },
    });
    if (crmExists) {
      return res.status(400).json({ error: 'CRM  already exists' });
    }

    const cpfExists = await Doctor.findOne({
      where: { cpf: req.body.cpf },
    });
    if (cpfExists) {
      return res.status(400).json({ error: 'CPF  already exists' });
    }

    const {
      crm,
      name,
      email,
      number_cell,
      date_birth,
      cpf,
      zip_code,
      address,
      district,
    } = await Doctor.create(req.body);

    return res.json({
      crm,
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

export default new DoctorController();
