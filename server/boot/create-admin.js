module.exports = app => {
  const {User, Role, RoleMapping} = app.models;

  User.findOrCreate(
    {
      where: {
        'username': process.env.ADMIN_USERNAME,
      },
    },
    {
      'username': process.env.ADMIN_USERNAME,
      'email': process.env.ADMIN_EMAIL,
      'password': process.env.ADMIN_PASSWORD,
    },
    (err, user) => {
      if (err) console.log(err);
      Role.findOrCreate(
        {
          where: {
            'name': 'admin',
          },
        },
        {
          'name': 'admin',
        },
        (err) => {
          if (err) console.log(err);
          RoleMapping.findOrCreate(
            {
              where: {
                principalType: 'admin',
                principalId: user.id,
              },
            },
            {
              principalType: 'admin',
              principalId: user.id,
            },
            (err) => {
              if (err) console.log(err);
            }
          );
        }
      );
    }
  );
};
