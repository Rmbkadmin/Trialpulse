-- AlterTable
ALTER TABLE "ResearchSite" ADD COLUMN     "therapeuticAreas" TEXT[] DEFAULT ARRAY[]::TEXT[];
