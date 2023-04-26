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
    telefone bigint not null unique,
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
    categoriaId INT not null,
    fornecedorId int not null,
    FOREIGN KEY (categoriaId) REFERENCES categorias(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (fornecedorId) REFERENCES fornecedores(id) ON DELETE RESTRICT ON UPDATE CASCADE
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
    ('Admin1', 'admin1@example.com', 'senha123'),
    ('Admin2', 'admin2@example.com', 'senha456'),
    ('Admin3', 'admin3@example.com', 'senha789'),
    ('Admin4', 'admin4@example.com', 'senha101'),
    ('Admin5', 'admin5@example.com', 'senha112');

INSERT INTO clientes (nome, telefone, email, senha, createdAt) VALUES 
    ('Cliente1', '11910706382', 'cliente1@example.com', 'senha123', NOW()),
    ('Cliente2', '11910706383', 'cliente2@example.com', 'senha456', NOW()),
    ('Cliente3', '11910706384', 'cliente3@example.com', 'senha789', NOW()),
    ('Cliente4', '11910706385', 'cliente4@example.com', 'senha101', NOW()),
    ('Cliente5', '11910706386', 'cliente5@example.com', 'senha112', NOW()),
    ('João Silva', '11998765432', 'joao.silva@example.com', 'senha123', NOW()),
    ('Maria Souza', '11987654321', 'maria.souza@example.com', 'senha456', NOW()),
    ('Pedro Santos', '11976543210', 'pedro.santos@example.com', 'senha789', NOW()),
    ('Fernanda Oliveira', '11965432109', 'fernanda.oliveira@example.com', 'senha101', NOW()),
    ('Ricardo Rocha', '11954321098', 'ricardo.rocha@example.com', 'senha112', NOW()),
    ('Camila Almeida', '11943210987', 'camila.almeida@example.com', 'senha123', NOW()),
    ('Lucas Ferreira', '11932109876', 'lucas.ferreira@example.com', 'senha456', NOW()),
    ('Amanda Costa', '11921098765', 'amanda.costa@example.com', 'senha789', NOW()),
    ('Gustavo Pereira', '11910987654', 'gustavo.pereira@example.com', 'senha101', NOW()),
    ('Isabela Lima', '11909876543', 'isabela.lima@example.com', 'senha112', NOW()),
    ('Renato Santos', '11998765432', 'renato.santos@example.com', 'senha123', NOW()),
    ('Larissa Oliveira', '11987654321', 'larissa.oliveira@example.com', 'senha456', NOW()),
    ('Felipe Oliveira', '11987654321', 'felipe.oliveira@example.com', 'senha123', NOW()),
    ('Julia Santos', '11976543210', 'julia.santos@example.com', 'senha456', NOW()),
    ('Roberto Silva', '11965432109', 'roberto.silva@example.com', 'senha789', NOW()),
    ('Ana Clara Souza', '11954321098', 'anaclara.souza@example.com', 'senha101', NOW()),
    ('Gabriel Pereira', '11943210987', 'gabriel.pereira@example.com', 'senha112', NOW()),
    ('Mariana Almeida', '11932109876', 'mariana.almeida@example.com', 'senha123', NOW()),
    ('Pedro Henrique Lima', '11921098765', 'pedrohenrique.lima@example.com', 'senha456', NOW());
    

INSERT INTO categorias (nome) VALUES 
    ('Categoria1'),
    ('Categoria2'),
    ('Categoria3'),
    ('Categoria4'),
    ('Categoria5');

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
    ('Fornecedor 5');

INSERT INTO produtos (nome, preco, categoriaId, fornecedorId) VALUES 
    ('Produto1', 10.99, 1, 2),
    ('Produto2', 29.99, 2, 4),
    ('Produto3', 49.99, 3, 3),
    ('Produto4', 99.99, 4, 3),
    ('Produto5', 149.99, 5, 5);

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
