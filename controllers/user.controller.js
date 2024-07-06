import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  if (userId !== id) {
    return res.status(403).json({ status: 'Forbidden', message: 'Access denied', statusCode: 403 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { userId: id } });
    if (!user) {
      return res.status(404).json({ status: 'Not Found', message: 'User not found', statusCode: 404 });
    }

    res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      data: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', message: 'An error occurred', statusCode: 500 });
  }
};
