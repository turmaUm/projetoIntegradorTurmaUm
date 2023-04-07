const Categorias = require('./Categorias')
const Avaliacoes = require('./Avaliacoes')
const Imagens = require('./Imagens')

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
            Produtos.hasMany(models.Avaliacoes, {
                foreign_key: 'produtos_id',
                as: 'produtos'
            })
            Produtos.hasMany(models.Imagens, {
                foreign_key: 'imagens_id',
                as: 'imagens'
            })
        }

        return Produtos
}
