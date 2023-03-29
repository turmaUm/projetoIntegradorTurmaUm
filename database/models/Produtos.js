const Categorias = require('./Categorias')

module.exports = (sequelize, DataTypes) => {
    const Produtos = sequelize.define('Produtos', {
        nome: {
            type:DataTypes.STRING(45),
            allowNull: false
        },
        preco: {
            type: DataTypes.DECIMAL(9,2),
            allowNull: false
        },
        categorias_id: DataTypes.INTEGER
    }, {
        tableName: 'produtos',
        paranoid: true
    })

        Produtos.associate = models => {
            Produtos.belongsTo(models.Categorias, {
                foreign_key: 'categorias_id',
                as: 'categorias'
            })
        }

        return Produtos
}
