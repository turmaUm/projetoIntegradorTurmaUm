module.exports = (sequelize, DataTypes) => {
    const Adms = sequelize.define('Administradores', {
        nome: {
            type:DataTypes.STRING(120),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING(64),
            allowNull: false
        }
    }, {
        tableName: 'administradores',
        paranoid: true
    })
        return Adms
}
