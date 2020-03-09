import * as Yup from 'yup';
import Patient from '../models/Patient';

class PatientController {
  async index(req, res) {
    const { id } = req.params;
    const patient = await Patient.findByPk(id, {
      include: {
        association: 'appointments',
        attributes: ['id', 'patient_id', 'date', 'type_appointment', 'user_id'],
      },
      attributes: [
        'id',
        'name',
        'email',
        'telephone',
        'cell_phone',
        'zip_code',
        'address',
        'number',
        'complement',
        'state',
        'city',
        'district',
        'active',
      ],
    });
    return res.json(patient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      cell_phone: Yup.string()
        .required()
        .max(11),
    });
    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }

    const emailExists = await Patient.findOne({
      where: { email: req.body.email },
    });
    if (emailExists) {
      return res.status(400).json({ error: 'Patient email already exists' });
    }

    const {
      id,
      name,
      email,
      telephone,
      cell_phone,
      zip_code,
      address,
      number,
      complement,
      state,
      city,
      district,
      active,
    } = await Patient.create(req.body);
    return res.json({
      id,
      name,
      email,
      telephone,
      cell_phone,
      zip_code,
      address,
      number,
      complement,
      state,
      city,
      district,
      active,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      cell_phone: Yup.string()
        .required()
        .max(11),
    });
    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }
    const { email } = req.body;

    const user = await Patient.findByPk(req.params);
    if (email !== user.email) {
      const emailExists = await Patient.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: 'Patient email already exists' });
      }
    }

    const {
      id,
      name,
      telephone,
      cell_phone,
      zip_code,
      address,
      number,
      complement,
      state,
      city,
      district,
      active,
    } = await Patient.update(req.body);

    return res.json({
      id,
      name,
      email,
      telephone,
      cell_phone,
      zip_code,
      address,
      number,
      complement,
      state,
      city,
      district,
      active,
    });
  }
}

export default new PatientController();
