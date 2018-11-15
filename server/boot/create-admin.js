'use strict';

module.exports = app => {
  const { Organizer, Role, RoleMapping } = app.models;

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
      'phone': process.env.ADMIN_PHONE,
    },
    (err, organizer) => {
      if (err) {
        console.log(err);
        return;
      }
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
          if (err) {
            console.log(err);
            return;
          }
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
              if (err) {
                console.log(err);
                return;
              }
            }
          );
        }
      );
    }
  );
};
