-- CreateTable
CREATE TABLE "psicologo" (
    "psicologo_id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido_paterno" VARCHAR(100) NOT NULL,
    "apellido_materno" VARCHAR(100) NOT NULL,
    "rut" VARCHAR(12) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(15),
    "perfil_profesional" TEXT,
    "especialidad" VARCHAR(100),
    "es_administrador" BOOLEAN NOT NULL DEFAULT false,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "psicologo_pkey" PRIMARY KEY ("psicologo_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "psicologo_rut_key" ON "psicologo"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "psicologo_email_key" ON "psicologo"("email");
