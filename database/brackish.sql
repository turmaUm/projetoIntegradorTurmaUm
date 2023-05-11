	drop database if exists brackish;
	create database brackish;
	use brackish;

create table administradores (
	id INT not null auto_increment primary key,
    nome varchar(120) not null,
    email varchar(45) unique not null,
    senha varchar(64)
);

create table fornecedores (
	id INT not null auto_increment primary key,
    nome varchar(120) not null
);

create table clientes (
	id INT not null auto_increment primary key,
    nome varchar(120) not null,
    telefone bigint null unique,
    email varchar(45) unique not null,
    senha varchar(64) not null,
    createdAt timestamp not null,
    updatedAt timestamp null,
    deletedAt timestamp null
);

create table categorias (
	id INT not null auto_increment primary key,
    nome varchar(45) not null
);

create table formas_de_pagamento (
	id INT not null auto_increment primary key,
    nome varchar(45) not null
);

create table produtos (
	id INT not null auto_increment primary key,
    nome varchar(45) not null,
    preco decimal(9,2),
    descricao text not null,
    endereco varchar(200),
    categoriaId INT not null,
    fornecedores_id int not null,
    FOREIGN KEY (categoriaId) REFERENCES categorias(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (fornecedores_id) REFERENCES fornecedores(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE tamanhos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(20) NOT NULL
);

CREATE TABLE cores (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(20) NOT NULL
);

CREATE TABLE produto_tamanho (
    produto_id INT NOT NULL,
    tamanho_id INT NOT NULL,
    PRIMARY KEY (produto_id, tamanho_id),
    FOREIGN KEY (produto_id) REFERENCES produtos (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tamanho_id) REFERENCES tamanhos (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE produto_cor (
    produto_id INT NOT NULL,
    cor_id INT NOT NULL,
    PRIMARY KEY (produto_id, cor_id),
    FOREIGN KEY (produto_id) REFERENCES produtos (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cor_id) REFERENCES cores (id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table enderecos (
	id INT not null auto_increment primary key,
    clientes_id INT not null,
    bairro VARCHAR(45) not null,
    logradouro VARCHAR(250) not null,
    numero varchar(6),
    cidade INT NOT NULL,
    cep varchar(8),
	FOREIGN KEY (clientes_id) REFERENCES clientes(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

create table pedidos (
	id INT not null auto_increment primary key,
    enderecos_id INT not null,
    clientes_id INT not null,
    formas_de_pagamento_id INT not null,
    createdAt timestamp not null,
    updatedAt timestamp null,
    deletedAt timestamp null,
    pagoAt timestamp null,
    entregueAt timestamp null,
    FOREIGN KEY (formas_de_pagamento_id) REFERENCES formas_de_pagamento(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (clientes_id, enderecos_id) REFERENCES enderecos(clientes_id, id)
);

create table produtos_pedidos (
	id INT not null auto_increment primary key,
	pedidos_id INT not null,
    produtos_id INT not null,
    quantidade DECIMAL(9,2) not null,
    FOREIGN KEY (pedidos_id) REFERENCES pedidos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (produtos_id) REFERENCES produtos(id) ON DELETE RESTRICT ON UPDATE CASCADE
    -- primary key (pedidos_id, produtos_id)
);

create table avaliacoes (
	id INT not null auto_increment primary key,
	clientes_id int not null,
    produtos_id int not null,
    nota TINYINT not null, 
    texto TEXT null,
    createdAt timestamp not null,
    updatedAt timestamp null,
    deletedAt timestamp null,
    -- primary key (clientes_id, produtos_id),
    FOREIGN KEY (clientes_id) REFERENCES clientes(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (produtos_id) REFERENCES produtos(id) ON DELETE RESTRICT ON UPDATE CASCADE    
);

create table imagens(
	imagens_id int not null primary key auto_increment,
    produtos_id int not null,
    caminho varchar(256) not null,
    FOREIGN KEY (produtos_id) REFERENCES produtos(id)
); 



INSERT INTO administradores (nome, email, senha) VALUES 
    ('Erick', 'erickadm@email.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq'),
    ('Alexandre', 'alexandreadm@email', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq'),
    ('Antonio', 'antonioadm@email.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq'),
    ('Maria', 'mariaadm@email.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq'),
    ('João', 'joaoadm@email.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq');

INSERT INTO clientes (nome, telefone, email, senha, createdAt) VALUES 
    ('Cliente1', '11910706382', 'cliente1@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Cliente2', '11910706383', 'cliente2@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Cliente3', '11910706384', 'cliente3@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Cliente4', '11910706385', 'cliente4@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Cliente5', '11910706386', 'cliente5@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('João Silva', '11998765532', 'joao.silva@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Maria Souza', '11987454321', 'maria.souza@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Pedro Santos', '11976545210', 'pedro.santos@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Fernanda Oliveira', '11962432109', 'fernanda.oliveira@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Ricardo Rocha', '11954321198', 'ricardo.rocha@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Camila Almeida', '11943219987', 'camila.almeida@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Lucas Ferreira', '11932189876', 'lucas.ferreira@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Amanda Costa', '11921498765', 'amanda.costa@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Gustavo Pereira', '11918987654', 'gustavo.pereira@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Isabela Lima', '11909871543', 'isabela.lima@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Renato Santos', '11998365432', 'renato.santos@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Larissa Oliveira', '11986654321', 'larissa.oliveira@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Felipe Oliveira', '11987654329', 'felipe.oliveira@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Julia Santos', '11976543215', 'julia.santos@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Roberto Silva', '11965437109', 'roberto.silva@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Ana Clara Souza', '11954323098', 'anaclara.souza@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Gabriel Pereira', '11948210987', 'gabriel.pereira@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Mariana Almeida', '11932108876', 'mariana.almeida@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW()),
    ('Pedro Henrique Lima', '11924098765', 'pedrohenrique.lima@example.com', '$2a$12$Sg4U9nUZCN1.7kXEUxkG9ejqT1XpxPSxMIqdlTHqOXPzO3IUVkzTq', NOW());
    

INSERT INTO categorias (nome) VALUES 
    ('praia'),
    ('homem'),
    ('novasofertas'),
    ('favoritos'),
    ('calca'),
	('rolling'),
    ('mulher'),
    ('intima'),
    ('privera'),
	('ofertas'),
	('sapatos'),
	('geek'),
    ('leve2pague1');

INSERT INTO formas_de_pagamento (nome) VALUES 
    ('Cartão de crédito'),
    ('Boleto bancário'),
    ('Pix'),
    ('Transferência bancária'),
    ('Dinheiro');

INSERT INTO fornecedores (nome) VALUES 
    ('Fornecedor 1'),
    ('Fornecedor 2'),
    ('Fornecedor 3'),
    ('Fornecedor 4'),
    ('Fornecedor 5'),
	('Fornecedor 6'),
    ('Fornecedor 7'),
    ('Fornecedor 8'),
    ('Fornecedor 9'),
    ('Fornecedor 10'),
	('Fornecedor 11');

INSERT INTO produtos (nome, preco, descricao, endereco, categoriaId, fornecedores_id) VALUES
    ('Bermuda Água Osklen', 159.9, 'Bermuda para uso em atividades aquáticas', '/img/roupas/bermuda-agua-osklen.png', 1, 1),
    ('Bermuda Sarja Gap', 129.9, 'Bermuda casual de sarja', '/img/roupas/bermuda-sarja-gap.png', 2, 2),
    ('Blazer Masculino', 329.9, 'Blazer elegante para uso formal', '/img/roupas/blazer-masculino.png', 2, 3),
    ('Blusa Moletom Flanelada', 199.9, 'Blusa de moletom flanelado para uso casual', '/img/roupas/blusa-moletom-flanelada.png', 3, 4),
    ('Blusa', 79.9, 'Blusa básica para uso casual', '/img/roupas/blusa.webp', 4, 5),
    ('Calça Jeans John John', 249.9, 'Calça jeans masculina de alta qualidade', '/img/roupas/calca-jeans-john-john.png', 5, 3),
    ('Calça Moletom Adidas', 179.9, 'Calça de moletom adidas para uso casual', '/img/roupas/calca-moletom-adidas.png', 6, 1),
    ('Calça Sarja Colcci Jogger', 219.9, 'Calça jogger de sarja feminina da Colcci', '/img/roupas/calca-sarja-colcci-jogger.png', 5, 6),
    ('Calça', 129.9, 'Calça casual de tecido leve', '/img/roupas/calca.jpg', 5, 2),
    ('Camisa Calvin Klein', 199.9, 'Camisa social masculina da marca Calvin Klein', '/img/roupas/camisa-calvin-klein.png', 2, 7),
    ('Camisa Feminina', 99.9, 'Camisa feminina casual de tecido leve', '/img/roupas/camisa-feminina.jpg', 7, 8),
    ('Camisa Polo Ralph', 239.9, 'Camisa polo masculina da marca Ralph Lauren', '/img/roupas/camisa-polo-ralph.png', 2, 3),
    ('Cueca', 39.9, 'Cueca masculina básica', '/img/roupas/cueca.webp', 8, 5),
    ('Jaqueta Bomber Adidas', 349.9, 'Jaqueta bomber da Adidas', '/img/roupas/jaqueta-bomber-adidas.png', 6, 1),
    ('Jaqueta Corta-Vento Adidas', 399.99, 'Jaqueta corta-vento da Adidas para atividades esportivas', '/img/roupas/jaqueta-corta-vento.png', 3, 1),
    ('Jaqueta Polo Ralph Lauren', 499.99, 'Jaqueta de couro masculina da marca Ralph Lauren', '/img/roupas/jaqueta-polo-ralph.png', 6, 3),
    ('Moletom Masculino John John', 359.99, 'Moletom masculino de alta qualidade da marca John John', '/img/roupas/moletom-john-john.png', 9, 3),
    ('Regata Mizuno Spark', 79.99, 'Regata esportiva da marca Mizuno', '/img/roupas/regata-mizuno-spark.png', 13, 9),
    ('Short Praia Premium', 119.99, 'Short para uso em atividades aquáticas', '/img/roupas/short-praia-premiun.png', 1, 10),
    ('Shorts Feminino Adidas', 129.99, 'Shorts feminino da Adidas para uso casual', '/img/roupas/shorts.jpg', 10, 1),
    ('Tênis Nike Air Max 270', 699.99, 'Tênis de corrida da Nike com tecnologia Air Max', '/img/roupas/tenis_nike.png', 11, 11);


INSERT INTO enderecos (clientes_id, bairro, logradouro, numero, cidade, cep) VALUES 
    (1, 'Centro', 'Rua A', '123', 1, '12345-678'),
    (2, 'Jardins', 'Rua B', '456', 2, '23456-789'),
    (3, 'Vila Olímpia', 'Rua C', '789', 3, '34567-890'),
    (4, 'Moema', 'Rua D', '1010', 4, '45678-901'),
    (5, 'Itaim Bibi', 'Rua E', '1111', 5, '56789-012');

INSERT INTO pedidos (enderecos_id, clientes_id, formas_de_pagamento_id, createdAt) VALUES 
    (1, 1, 1, NOW()),
    (2, 2, 2, NOW()),
    (3, 3, 3, NOW()),
    (4, 4, 4, NOW()),
    (5, 5, 5, NOW());

INSERT INTO produtos_pedidos (pedidos_id, produtos_id, quantidade) VALUES 
    (1, 1, 2),
	(1, 3, 2),
	(1, 2, 1),
    (2, 2, 1),
    (3, 3, 3),
    (4, 4, 1),
    (5, 5, 2);
    
INSERT INTO avaliacoes (clientes_id, produtos_id, nota, texto, createdAt) VALUES
(1, 1, 4, "Gostei bastante do produto, recomendo!", NOW()),
(2, 3, 3, "O produto é bom, mas não atendeu todas as minhas expectativas", NOW()),
(3, 2, 5, "Produto excelente, superou minhas expectativas", NOW()),
(4, 5, 2, "Infelizmente não gostei do produto, não compraria novamente", NOW()),
(5, 4, 4, "Produto muito bom, recomendo para quem está procurando algo de qualidade", NOW());

INSERT INTO imagens (produtos_id, caminho) VALUES
(1, "/imagens/produto1.jpg"),
(2, "/imagens/produto2.jpg"),
(3, "/imagens/produto3.jpg"),
(4, "/imagens/produto4.jpg"),
(5, "/imagens/produto5.jpg");

INSERT INTO formas_de_pagamento (nome) VALUES
("Cartão de crédito"),
("Boleto bancário"),
("Transferência bancária"),
("PayPal"),
("Dinheiro");

INSERT INTO cores (nome) VALUES
('azul'),
('verde'),
('cinza'),
('preto'),
('bege'),
('branco'),
('vermelho'),
('marrom'),
('amarelo'),
('rosa'),
('laranja');

INSERT INTO tamanhos (nome) VALUES
('PP'),
('P'),
('M'),
('G'),
('GG'),
('XXL'),
('34'),
('36'),
('38'),
('40'),
('42'),
('44');

INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('1', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('1', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('1', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('1', '2');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('2', '5');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('2', '8');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('2', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('3', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('3', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('3', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('3', '7');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('4', '7');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('4', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('4', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('4', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('4', '2');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('5', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('5', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('5', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('5', '7');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('6', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('6', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('7', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('7', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('8', '2');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('8', '5');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('8', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('9', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('9', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('9', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('9', '7');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('10', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('10', '10');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('11', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('11', '9');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('11', '2');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('11', '10');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('12', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('12', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('13', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('13', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('14', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('14', '2');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('14', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('14', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('14', '7');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('15', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('15', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('15', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('16', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('16', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('16', '2');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('16', '8');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('17', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('17', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('17', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('17', '7');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('18', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('18', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('19', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('19', '2');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('19', '11');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('19', '9');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('20', '10');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('20', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('20', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('20', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('21', '4');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('21', '3');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('21', '1');
INSERT INTO `brackish`.`produto_cor` (`produto_id`, `cor_id`) VALUES ('21', '7');


INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('1', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('1', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('1', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('1', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('2', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('2', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('2', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('2', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('3', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('3', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('3', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('3', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('4', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('4', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('4', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('4', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('5', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('5', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('5', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('5', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('6', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('6', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('6', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('7', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('7', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('7', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('7', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('8', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('8', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('8', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('8', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('9', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('9', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('9', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('9', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('10', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('10', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('10', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('10', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('11', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('11', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('11', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('11', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('12', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('12', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('12', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('12', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('13', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('13', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('13', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('13', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('14', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('14', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('14', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('14', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('15', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('15', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('15', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('15', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('16', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('16', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('16', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('16', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('17', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('17', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('17', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('17', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('18', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('18', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('18', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('18', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('19', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('19', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('19', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('19', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('20', '1');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('20', '2');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('20', '3');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('20', '4');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('21', '7');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('21', '8');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('21', '9');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('21', '10');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('21', '11');
INSERT INTO `brackish`.`produto_tamanho` (`produto_id`, `tamanho_id`) VALUES ('21', '12');


