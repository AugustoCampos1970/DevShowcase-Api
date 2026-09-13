const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DevShowcase API',
      version: '1.0.0',
      description: 'API REST completa para vitrine de projetos de desenvolvedores',
      contact: {
        name: 'DevShowcase Team',
        url: 'https://github.com/devshowcase',
        email: 'devshowcase@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://devshowcase-api.onrender.com',
        description: 'Production server'
      }
    ],
    tags: [
      {
        name: 'Profiles',
        description: 'Operações relacionadas a perfis de desenvolvedores'
      },
      {
        name: 'Projects',
        description: 'Operações relacionadas a projetos'
      },
      {
        name: 'Technologies',
        description: 'Operações relacionadas a tecnologias'
      },
      {
        name: 'Feedbacks',
        description: 'Operações relacionadas a feedbacks e avaliações'
      },
      {
        name: 'Health',
        description: 'Endpoints de monitoramento e saúde da API'
      }
    ],
    components: {
      schemas: {
        Profile: {
          type: 'object',
          required: ['name'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do perfil',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Nome do desenvolvedor',
              example: 'João Silva'
            },
            bio: {
              type: 'string',
              description: 'Biografia do desenvolvedor',
              example: 'Desenvolvedor Full Stack com 5 anos de experiência'
            },
            avatarUrl: {
              type: 'string',
              description: 'URL do avatar do desenvolvedor',
              example: 'https://github.com/joaosilva.png'
            },
            githubUrl: {
              type: 'string',
              description: 'URL do perfil GitHub',
              example: 'https://github.com/joaosilva'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do perfil'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização do perfil'
            }
          }
        },
        Technology: {
          type: 'object',
          required: ['name'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único da tecnologia',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Nome da tecnologia',
              example: 'Node.js'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação da tecnologia'
            }
          }
        },
        Project: {
          type: 'object',
          required: ['title', 'profileId', 'technologyIds'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do projeto',
              example: 1
            },
            title: {
              type: 'string',
              description: 'Título do projeto',
              example: 'DevShowcase API'
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada do projeto',
              example: 'API REST completa para portfólio de desenvolvedores'
            },
            repositoryUrl: {
              type: 'string',
              description: 'URL do repositório do projeto',
              example: 'https://github.com/joaosilva/devshowcase-api'
            },
            liveUrl: {
              type: 'string',
              description: 'URL de deploy do projeto',
              example: 'https://devshowcase-api.herokuapp.com'
            },
            likes: {
              type: 'integer',
              description: 'Número de curtidas/upvotes',
              example: 42
            },
            averageRating: {
              type: 'number',
              format: 'float',
              description: 'Média das avaliações (1-5)',
              example: 4.5
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do projeto'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização do projeto'
            },
            profile: {
              $ref: '#/components/schemas/Profile'
            },
            technologies: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Technology'
              }
            }
          }
        },
        Feedback: {
          type: 'object',
          required: ['rating', 'authorName', 'projectId'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do feedback',
              example: 1
            },
            rating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              description: 'Avaliação de 1 a 5 estrelas',
              example: 5
            },
            comment: {
              type: 'string',
              description: 'Comentário sobre o projeto',
              example: 'Excelente projeto! Muito bem documentado.'
            },
            authorName: {
              type: 'string',
              description: 'Nome do autor do feedback',
              example: 'Ana Costa'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do feedback'
            },
            projectId: {
              type: 'integer',
              description: 'ID do projeto relacionado',
              example: 1
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'Not Found'
            },
            message: {
              type: 'string',
              example: 'Profile not found'
            }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'Validation Error'
            },
            message: {
              type: 'string',
              example: 'Invalid request data'
            },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'name'
                  },
                  message: {
                    type: 'string',
                    example: 'Name is required'
                  }
                }
              }
            }
          }
        },
        Pagination: {
          type: 'object',
          properties: {
            page: {
              type: 'integer',
              example: 1
            },
            limit: {
              type: 'integer',
              example: 10
            },
            total: {
              type: 'integer',
              example: 25
            },
            totalPages: {
              type: 'integer',
              example: 3
            },
            hasNextPage: {
              type: 'boolean',
              example: true
            },
            hasPrevPage: {
              type: 'boolean',
              example: false
            }
          }
        }
      }
    },
    paths: {
      '/health': {
        get: {
          tags: ['Health'],
          summary: 'Verifica a saúde da API',
          responses: {
            200: { description: 'API em pleno funcionamento' }
          }
        }
      },
      '/api/profiles': {
        get: {
          tags: ['Profiles'],
          summary: 'Listar todos os perfis',
          responses: {
            200: { description: 'Lista de perfis retornada com sucesso' }
          }
        },
        post: {
          tags: ['Profiles'],
          summary: 'Criar um novo perfil',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateProfileInput' }
              }
            }
          },
          responses: {
            201: { description: 'Perfil criado com sucesso' }
          }
        }
      },
      '/api/profiles/{id}': {
        get: {
          tags: ['Profiles'],
          summary: 'Buscar perfil por ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Perfil encontrado' },
            404: { description: 'Perfil não encontrado' }
          }
        }
      },
      '/api/projects': {
        get: {
          tags: ['Projects'],
          summary: 'Listar todos os projetos',
          parameters: [
            { name: 'technology', in: 'query', schema: { type: 'string' }, description: 'Filtrar por tecnologia' },
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }
          ],
          responses: {
            200: { description: 'Lista de projetos' }
          }
        },
        post: {
          tags: ['Projects'],
          summary: 'Criar um novo projeto',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateProjectInput' }
              }
            }
          },
          responses: {
            201: { description: 'Projeto criado com sucesso' }
          }
        }
      },
      '/api/projects/{id}': {
        get: {
          tags: ['Projects'],
          summary: 'Buscar projeto por ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Projeto encontrado' },
            404: { description: 'Projeto não encontrado' }
          }
        }
      },
      '/api/projects/{id}/upvote': {
        put: {
          tags: ['Projects'],
          summary: 'Dar upvote/curtir um projeto',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Upvote registrado com sucesso' }
          }
        }
      },
      '/api/technologies': {
        get: {
          tags: ['Technologies'],
          summary: 'Listar todas as tecnologias',
          responses: {
            200: { description: 'Lista de tecnologias' }
          }
        },
        post: {
          tags: ['Technologies'],
          summary: 'Criar uma nova tecnologia',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateTechnologyInput' }
              }
            }
          },
          responses: {
            201: { description: 'Tecnologia criada com sucesso' }
          }
        }
      },
      '/api/technologies/{id}': {
        get: {
          tags: ['Technologies'],
          summary: 'Buscar tecnologia por ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Tecnologia encontrada' },
            404: { description: 'Tecnologia não encontrada' }
          }
        }
      },
      '/api/projects/{id}/feedbacks': {
        post: {
          tags: ['Feedbacks'],
          summary: 'Adicionar feedback a um projeto',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateFeedbackInput' }
              }
            }
          },
          responses: {
            201: { description: 'Feedback adicionado com sucesso' }
          }
        }
      },
      '/api/projects/{projectId}/feedbacks': {
        get: {
          tags: ['Feedbacks'],
          summary: 'Listar feedbacks de um projeto',
          parameters: [
            { name: 'projectId', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Lista de feedbacks' }
          }
        }
      },
      '/api/projects/{projectId}/average-rating': {
        get: {
          tags: ['Feedbacks'],
          summary: 'Média de avaliação de um projeto',
          parameters: [
            { name: 'projectId', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Média de avaliação retornada com sucesso' }
          }
        }
      },
      '/api/feedbacks/{id}': {
        get: {
          tags: ['Feedbacks'],
          summary: 'Buscar feedback por ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Feedback encontrado' },
            404: { description: 'Feedback não encontrado' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js', './src/dtos/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`📚 Swagger docs available at http://localhost:${port}/docs`);
};

module.exports = swaggerDocs;