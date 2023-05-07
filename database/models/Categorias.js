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
                foreignKey: 'categoriaId',
                as: 'produtos'
            })
        }

        return Categorias
}
