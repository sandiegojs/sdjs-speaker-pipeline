'use strict';

module.exports = app => {
  const { Organizer, Role, RoleMapping } = app.models;

  Organizer.findOrCreate(
    {
      'where': {
        'email': process.env.ADMIN_EMAIL,
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
        console.log(`Error creating new organizer. An organizer exists.`);
        return;
      }
      Role.findOrCreate(
        {
          'where': {
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
              'where': {
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
