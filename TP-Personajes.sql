USE [master]
GO
/****** Object:  Database [TP-Personajes]    Script Date: 5/5/2023 12:09:35 ******/
CREATE DATABASE [TP-Personajes]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TP-Personajes', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\TP-Personajes.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TP-Personajes_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\TP-Personajes_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [TP-Personajes] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TP-Personajes].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TP-Personajes] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TP-Personajes] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TP-Personajes] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TP-Personajes] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TP-Personajes] SET ARITHABORT OFF 
GO
ALTER DATABASE [TP-Personajes] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TP-Personajes] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TP-Personajes] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TP-Personajes] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TP-Personajes] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TP-Personajes] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TP-Personajes] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TP-Personajes] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TP-Personajes] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TP-Personajes] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TP-Personajes] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TP-Personajes] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TP-Personajes] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TP-Personajes] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TP-Personajes] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TP-Personajes] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TP-Personajes] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TP-Personajes] SET RECOVERY FULL 
GO
ALTER DATABASE [TP-Personajes] SET  MULTI_USER 
GO
ALTER DATABASE [TP-Personajes] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TP-Personajes] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TP-Personajes] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TP-Personajes] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TP-Personajes] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'TP-Personajes', N'ON'
GO
ALTER DATABASE [TP-Personajes] SET QUERY_STORE = OFF
GO
USE [TP-Personajes]
GO
/****** Object:  User [alumno]    Script Date: 5/5/2023 12:09:35 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Pelicula]    Script Date: 5/5/2023 12:09:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pelicula](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](max) NOT NULL,
	[Titulo] [varchar](max) NOT NULL,
	[Fecha] [date] NOT NULL,
	[Calificacion] [int] NOT NULL,
 CONSTRAINT [PK_Pelicula] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PeliculaPersonaje]    Script Date: 5/5/2023 12:09:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PeliculaPersonaje](
	[Id_personaje] [int] NOT NULL,
	[Id_pelicula] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personaje]    Script Date: 5/5/2023 12:09:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personaje](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](max) NOT NULL,
	[Nombre] [varchar](max) NOT NULL,
	[Edad] [int] NOT NULL,
	[Peso] [float] NOT NULL,
	[Historia] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Personaje] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Pelicula] ON 

INSERT [dbo].[Pelicula] ([Id], [Imagen], [Titulo], [Fecha], [Calificacion]) VALUES (1, N'https://m.media-amazon.com/images/M/MV5BMWZmMTg3NjktMjQzMy00ZDE3LThlYmQtMmZjMzcxMDUwMzAwXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_.jpg', N'The Good Place', CAST(N'2016-09-19' AS Date), 8)
INSERT [dbo].[Pelicula] ([Id], [Imagen], [Titulo], [Fecha], [Calificacion]) VALUES (2, N'data:image/jpeg;base64,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', N'Proyecto X', CAST(N'2012-03-15' AS Date), 6)
INSERT [dbo].[Pelicula] ([Id], [Imagen], [Titulo], [Fecha], [Calificacion]) VALUES (3, N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT60wkcOpOdDmAicSnP5kW0cmlV95hEMGlyoo8PEgabEp6O5hq', N'Si Señor', CAST(N'2009-01-15' AS Date), 7)
SET IDENTITY_INSERT [dbo].[Pelicula] OFF
GO
SET IDENTITY_INSERT [dbo].[Personaje] ON 

INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (1, N'imagen1.jpg', N'Eleanor Shellstrop', 32, 135, N'Eleanor fue una mujer egoísta y desagradable en vida, pero se encuentra en el Good Place por un error del sistema.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (2, N'imagen2.jpg', N'Chidi Anagonye', 36, 165, N'Chidi era un profesor de ética en vida, y se encuentra en el Good Place por su obsesión por hacer lo correcto.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (3, N'imagen3.jpg', N'Tahani Al-Jamil', 29, 125, N'Tahani era una socialité y filántropa en vida, y se encuentra en el Good Place por sus buenas acciones.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (4, N'imagen4.jpg', N'Jason Mendoza', 28, 140, N'Jason era un delincuente y aficionado a los Jaguars de Jacksonville en vida, y se encuentra en el Good Place por un error del sistema.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (5, N'imagen5.jpg', N'Janet', 3, 2, N'Janet es un ser artificial que proporciona información y servicios en el Good Place.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (6, N'imagen6.jpg', N'Michael', 4, 1, N'Michael es el arquitecto del Good Place, responsable de crear y mantener el vecindario.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (7, N'imagen7.jpg', N'Bad Janet', 5, 43, N'Bad Janet es el opuesto de Janet, y es un ser artificial que proporciona información y servicios en el Bad Place.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (8, N'imagen1.jpg', N'Thomas Kub', 17, 150, N'Thomas es el protagonista de la película, un joven de secundaria que organiza una fiesta con sus amigos para hacerse populares.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (9, N'imagen2.jpg', N'Costa', 17, 170, N'Costa es el mejor amigo de Thomas, y es quien lo convence de organizar la fiesta. Es el líder del grupo.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (10, N'imagen3.jpg', N'JB', 17, 160, N'JB es otro amigo de Thomas, y es quien documenta la fiesta en video.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (11, N'imagen4.jpg', N'Dax', 17, 155, N'Dax es un amigo de Thomas y el encargado de la seguridad durante la fiesta.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (12, N'imagen5.jpg', N'Miles', 17, 145, N'Miles es un amigo de Thomas y el encargado de la música durante la fiesta.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (13, N'imagen6.jpg', N'Tyler', 17, 140, N'Tyler es un amigo de Thomas y el encargado de la bebida durante la fiesta.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (14, N'imagen7.jpg', N'Kirby', 16, 135, N'Kirby es una chica que le gusta a Thomas y asiste a la fiesta.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (15, N'imagen1.jpg', N'Carl Allen', 40, 200, N'Carl es el protagonista de la película, un hombre que se encuentra en una crisis personal y decide decir "sí" a todas las oportunidades que se le presenten.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (16, N'imagen2.jpg', N'Allison', 30, 120, N'Allison es una mujer que Carl conoce en un curso de autoayuda.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (17, N'imagen3.jpg', N'Norman', 50, 170, N'Norman es el jefe de Carl, y quien le sugiere la idea de decir "sí" a todo.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (18, N'imagen4.jpg', N'Peter', 40, 180, N'Peter es el vecino de Carl, y uno de los primeros en ser afectados por la actitud de "sí" de Carl.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (19, N'imagen5.jpg', N'Terrence', 30, 160, N'Terrence es un compañero de trabajo de Carl, quien le presenta a Allison.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (20, N'imagen6.jpg', N'Tweed', 1, 2, N'Tweed es un hombre que Carl conoce en una carrera de bicicletas.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (21, N'imagen7.jpg', N'Nick', 3, 56, N'Nick es un exnovio de Allison, quien trata de reconquistarla durante la película.')
SET IDENTITY_INSERT [dbo].[Personaje] OFF
GO
ALTER TABLE [dbo].[PeliculaPersonaje]  WITH CHECK ADD  CONSTRAINT [FK_PeliculaPersonaje_Pelicula] FOREIGN KEY([Id_pelicula])
REFERENCES [dbo].[Pelicula] ([Id])
GO
ALTER TABLE [dbo].[PeliculaPersonaje] CHECK CONSTRAINT [FK_PeliculaPersonaje_Pelicula]
GO
ALTER TABLE [dbo].[PeliculaPersonaje]  WITH CHECK ADD  CONSTRAINT [FK_PeliculaPersonaje_Personaje] FOREIGN KEY([Id_personaje])
REFERENCES [dbo].[Personaje] ([Id])
GO
ALTER TABLE [dbo].[PeliculaPersonaje] CHECK CONSTRAINT [FK_PeliculaPersonaje_Personaje]
GO
USE [master]
GO
ALTER DATABASE [TP-Personajes] SET  READ_WRITE 
GO


