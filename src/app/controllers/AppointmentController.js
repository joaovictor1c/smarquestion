import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import Appointment from '../models/Appointment';
import Patient from '../models/Patient';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { patient_id } = req.params;
    const index = await Appointment.findAll({
      where: { patient_id, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'type_appointment'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Patient,
          as: 'patients',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(index);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      patient_id: Yup.number().required(),
      date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }
    const { patient_id, date, type_appointment } = req.body;

    const isPatient = await Patient.findOne({ where: { id: patient_id } });
    if (!isPatient) {
      return res.status(401).json({ error: 'patient does not exist' });
    }

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        patient_id,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not avaliable' });
    }
    const appointment = await Appointment.create({
      user_id: req.userId,
      patient_id,
      date,
      type_appointment,
    });
    return res.json(appointment);
  }
}

export default new AppointmentController();
