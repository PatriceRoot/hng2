import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getOrganisations = async (req, res) => {
  const userId = req.user.userId;

  try {
    const organisations = await prisma.organisation.findMany({
      where: {
        users: {
          some: {
            userId
          }
        }
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Organisations retrieved successfully',
      data: { organisations }
    });
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', message: 'An error occurred', statusCode: 500 });
  }
};

export const getOrganisationById = async (req, res) => {
  const { orgId } = req.params;
  const userId = req.user.userId;

  try {
    const organisation = await prisma.organisation.findUnique({
      where: { orgId },
      include: {
        users: true
      }
    });

    if (!organisation || !organisation.users.some(user => user.userId === userId)) {
      return res.status(403).json({ status: 'Forbidden', message: 'Access denied', statusCode: 403 });
    }

    res.status(200).json({
      status: 'success',
      message: 'Organisation retrieved successfully',
      data: organisation
    });
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', message: 'An error occurred', statusCode: 500 });
  }
};

export const createOrganisation = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.userId;

  try {
    const organisation = await prisma.organisation.create({
      data: {
        name,
        description,
        users: {
          create: { userId }
        }
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: organisation
    });
  } catch (error) {
    res.status(400).json({ status: 'Bad Request', message: 'Client error', statusCode: 400 });
  }
};

export const addUserToOrganisation = async (req, res) => {
  const { orgId } = req.params;
  const { userId } = req.body;

  try {
    await prisma.organisationUser.create({
      data: {
        userId,
        orgId
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'User added to organisation successfully'
    });
  } catch (error) {
    res.status(400).json({ status: 'Bad Request', message: 'Client error', statusCode: 400 });
  }
};
