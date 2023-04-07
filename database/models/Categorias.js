const Produtos = require('./Produtos')

module.exports = (sequelize, DataTypes) => {
    const Categorias = sequelize.define('Categorias', {
        nome: {
            type:DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 'categorias',
        timestamps: false
    })

        Categorias.associate = models => {
            Categorias.hasMany(models.Produtos, {
                foreign_key: 'categorias_id',
                as: 'produtos'
            })
        }

        return Categorias
}
