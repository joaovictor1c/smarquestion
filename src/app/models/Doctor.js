import Sequelize, { Model } from 'sequelize';

class Doctor extends Model {
  static init(sequelize) {
    super.init(
      {
        crm: Sequelize.STRING,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        number_cell: Sequelize.STRING,
        date_birth: Sequelize.STRING,
        cpf: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        address: Sequelize.STRING,
        district: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    Doctor.removeAttribute('id');
    return this;
  }
}

export default Doctor;
