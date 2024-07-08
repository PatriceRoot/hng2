import User from '../models/user.model.js';

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!user) {
      return res.status(404).json({
        status: 'Not found',
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User fetched successfully',
      data: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};
