const Produtos = require('./Produtos')

module.exports = (sequelize, DataTypes) => {
    const Fornecedores = sequelize.define('Fornecedores', {
        nome: {
            type: DataTypes.STRING(120),
            allowNull: false
        }
    }, {
        tableName: 'fornecedores',
        timestamps: false
    })

    Fornecedores.associate = models => {
        Fornecedores.hasMany(models.Produtos, {
            foreignKey: 'fornecedores_id',
            as: 'produtos'
        })
    }

        return Fornecedores
}
