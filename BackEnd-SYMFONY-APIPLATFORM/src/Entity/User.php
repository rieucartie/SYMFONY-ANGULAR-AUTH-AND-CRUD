<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\EntityListeners({App\EntityListener\UserListener::class})
 * @ApiResource(
 *  normalizationContext={"groups":{"userRead"}},
 *  itemOperations={
 *      "put":{"validation_groups"={"profile"}},
 *      "get",
 *      "delete"
 *  },
 *  collectionOperations={
 *      "get",
 *      "post":{"validation_groups"={"registration"}},
 *
 *  }
 * )
 * @UniqueEntity(
 *      fields={"email"},
 *      message="Vous ne pouvez pas créer un compte avec cette adresse email",
 *      groups={"registration", "profile"}
 * )
 */
class User implements UserInterface, \Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"userRead"})
     * @Assert\NotBlank(message="Le nom complet est obligatoire !", groups={"registration","profile"})
     */
    private ?string $fullName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"userRead"})
     * @Assert\NotBlank(message="L'adresse email est obligatoire !", groups={"registration","profile"})
     * @Assert\Email(message="L'adresse email soumise n'est pas au format réglementaire", groups={"registration","profile"})
     */
    private ?string $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private ?string $password;

    /**
     * @Assert\NotBlank(message="Le mot de passe est obligatoire !", groups={"registration"})
     */
    private ?string $plainPassword= null;

    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups({"userRead"})
     *
     * @var array<string>
     */
    private array $roles = [];


    public function __construct()
    {

    }

    public function getRoles(): array
    {
        $this->roles[] = 'ROLE_USER';

        return array_unique($this->roles);
    }

    public function getSalt(): ?string
    {
        return null;
    }

    public function getUsername(): string
    {
        return $this->email;
    }

    public function eraseCredentials(): void
    {
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName): self
    {
        $this->fullName = $fullName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @param array<string>|null $roles
     */
    public function setRoles(?array $roles = []): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }
}
