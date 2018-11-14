module.exports = app => {
  const {Organizer, Role, RoleMapping} = app.models;

  Organizer.findOrCreate(
    {
      where: {
        'username': process.env.ADMIN_USERNAME,
      },
    },
    {
      'username': process.env.ADMIN_USERNAME,
      'email': process.env.ADMIN_EMAIL,
      'password': process.env.ADMIN_PASSWORD,
      'phone': '111-111-1111'
    },
    (err, organizer) => {
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
                principalId: organizer.id,
              },
            },
            {
              principalType: 'admin',
              principalId: organizer.id,
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
