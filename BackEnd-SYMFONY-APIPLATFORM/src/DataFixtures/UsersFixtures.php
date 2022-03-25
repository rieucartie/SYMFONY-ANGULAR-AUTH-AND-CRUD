<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class UsersFixtures extends Fixture
{

    public function load(ObjectManager $manager): void
    {
        $manager->persist((new User)
                ->setEmail("admin@mail.com")
                ->setPlainPassword("123")
                ->setFullName("admin")
                ->setRoles(['ROLE_ADMIN']));

        $manager->persist((new User)
            ->setEmail("cart@mail.com")
            ->setPlainPassword("123")
            ->setFullName("Francois cart"))
             ->setRoles(['ROLE_USER']);

        $manager->persist((new User)
            ->setEmail("nadine@mail.com")
            ->setPlainPassword("123")
            ->setFullName("Nadine Dupont"))
            ->setRoles(['ROLE_USER']);
        $manager->flush();
    }
}
