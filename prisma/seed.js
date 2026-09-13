const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (in reverse order due to foreign key constraints)
  console.log('🧹 Cleaning existing data...');
  await prisma.feedback.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.profile.deleteMany();

  // Create profiles
  console.log('👤 Creating profiles...');
  const profile1 = await prisma.profile.create({
    data: {
      name: 'João Silva',
      bio: 'Desenvolvedor Full Stack com 5 anos de experiência em JavaScript, Node.js e React.',
      githubUrl: 'https://github.com/joaosilva',
      avatarUrl: 'https://github.com/joaosilva.png'
    }
  });

  const profile2 = await prisma.profile.create({
    data: {
      name: 'Maria Santos',
      bio: 'Engenheira de Software especializada em Python e Machine Learning.',
      githubUrl: 'https://github.com/mariasantos',
      avatarUrl: 'https://github.com/mariasantos.png'
    }
  });

  const profile3 = await prisma.profile.create({
    data: {
      name: 'Carlos Oliveira',
      bio: 'Desenvolvedor Backend com foco em Java e Microsserviços.',
      githubUrl: 'https://github.com/carlosoliveira',
      avatarUrl: 'https://github.com/carlosoliveira.png'
    }
  });

  // Create technologies
  console.log('🔧 Creating technologies...');
  const technologies = await Promise.all([
    prisma.technology.create({ data: { name: 'JavaScript' } }),
    prisma.technology.create({ data: { name: 'TypeScript' } }),
    prisma.technology.create({ data: { name: 'Node.js' } }),
    prisma.technology.create({ data: { name: 'Express' } }),
    prisma.technology.create({ data: { name: 'React' } }),
    prisma.technology.create({ data: { name: 'PostgreSQL' } }),
    prisma.technology.create({ data: { name: 'Python' } }),
    prisma.technology.create({ data: { name: 'Django' } }),
    prisma.technology.create({ data: { name: 'Java' } }),
    prisma.technology.create({ data: { name: 'Spring Boot' } }),
    prisma.technology.create({ data: { name: 'Docker' } }),
    prisma.technology.create({ data: { name: 'Kubernetes' } }),
  ]);

  // Helper function to get technology objects by name for connect
  const getTechIds = (...names) => 
    technologies.filter(t => names.includes(t.name)).map(t => ({ id: t.id }));

  // Create projects
  console.log('🚀 Creating projects...');
  const project1 = await prisma.project.create({
    data: {
      title: 'DevShowcase API',
      description: 'API REST completa para portfólio de desenvolvedores, com autenticação, CRUD e documentação Swagger.',
      repositoryUrl: 'https://github.com/joaosilva/devshowcase-api',
      liveUrl: 'https://devshowcase-api.herokuapp.com',
      likes: 42,
      averageRating: 4.5,
      profileId: profile1.id,
      technologies: {
        connect: getTechIds('Node.js', 'Express', 'PostgreSQL', 'TypeScript')
      }
    }
  });

  const project2 = await prisma.project.create({
    data: {
      title: 'E-commerce Platform',
      description: 'Plataforma de e-commerce completa com carrinho de compras, pagamentos e dashboard administrativo.',
      repositoryUrl: 'https://github.com/mariasantos/ecommerce-platform',
      liveUrl: 'https://ecommerce.example.com',
      likes: 87,
      averageRating: 4.8,
      profileId: profile2.id,
      technologies: {
        connect: getTechIds('Python', 'Django', 'PostgreSQL', 'Docker')
      }
    }
  });

  const project3 = await prisma.project.create({
    data: {
      title: 'Banking Microservices',
      description: 'Sistema bancário baseado em microsserviços com Spring Boot, Kubernetes e API Gateway.',
      repositoryUrl: 'https://github.com/carlosoliveira/banking-microservices',
      liveUrl: 'https://banking.example.com',
      likes: 156,
      averageRating: 4.7,
      profileId: profile3.id,
      technologies: {
        connect: getTechIds('Java', 'Spring Boot', 'Kubernetes', 'Docker')
      }
    }
  });

  const project4 = await prisma.project.create({
    data: {
      title: 'Task Management App',
      description: 'Aplicativo de gerenciamento de tarefas com drag-and-drop, notificações e colaboração em tempo real.',
      repositoryUrl: 'https://github.com/joaosilva/task-manager',
      liveUrl: 'https://taskmanager.example.com',
      likes: 23,
      averageRating: 4.2,
      profileId: profile1.id,
      technologies: {
        connect: getTechIds('React', 'Node.js', 'Express', 'PostgreSQL')
      }
    }
  });

  // Create feedbacks
  console.log('💬 Creating feedbacks...');
  await prisma.feedback.createMany({
    data: [
      {
        rating: 5,
        comment: 'Excelente API! Muito bem documentada e fácil de usar.',
        authorName: 'Ana Costa',
        projectId: project1.id
      },
      {
        rating: 4,
        comment: 'Boa implementação, mas poderia ter mais exemplos de uso.',
        authorName: 'Pedro Lima',
        projectId: project1.id
      },
      {
        rating: 5,
        comment: 'Ótima plataforma! Interface intuitiva e performance excelente.',
        authorName: 'Fernanda Rocha',
        projectId: project2.id
      },
      {
        rating: 5,
        comment: 'Arquitetura muito bem pensada. Parabéns pelo trabalho!',
        authorName: 'Ricardo Alves',
        projectId: project3.id
      },
      {
        rating: 4,
        comment: 'App muito útil, mas precisa de mais features de colaboração.',
        authorName: 'Juliana Mendes',
        projectId: project4.id
      },
      {
        rating: 3,
        comment: 'Funciona bem, mas a UI poderia ser mais moderna.',
        authorName: 'Roberto Santos',
        projectId: project4.id
      }
    ]
  });

  console.log('✅ Seed completed successfully!');
  console.log('📊 Statistics:');
  console.log(`   Profiles: 3`);
  console.log(`   Technologies: ${technologies.length}`);
  console.log(`   Projects: 4`);
  console.log(`   Feedbacks: 6`);

  console.log('\n🔗 Test endpoints:');
  console.log('   Health check: http://localhost:3000/health');
  console.log('   List profiles: http://localhost:3000/api/profiles');
  console.log('   List projects: http://localhost:3000/api/projects');
  console.log('   List technologies: http://localhost:3000/api/technologies');
}

main()
  .catch((error) => {
    console.error('❌ Error during seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });