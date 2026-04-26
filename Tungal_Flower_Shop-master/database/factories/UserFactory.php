<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
public function definition(): array
    {
        return [
            'firstname'       => $this->faker->firstName,
            'lastname'        => $this->faker->lastName,
            'contact_number'  => $this->faker->unique()->numerify('09#########'),
            // STRICTLY the 5 roles you defined
            'role'            => $this->faker->randomElement(['Admin', 'Cashier', 'Delivery', 'Manager', 'Owner']),
            'address'         => $this->faker->address,
            'hired_date'      => $this->faker->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
            'username'        => $this->faker->unique()->userName,
            'password'        => \Illuminate\Support\Facades\Hash::make('password'), 
            'profile'         => 'profiles/' . $this->faker->uuid . '.jpg',
            'remember_token'  => \Illuminate\Support\Str::random(10),
            'created_at'      => $this->faker->dateTimeBetween('-6 months'),
            'updated_at'      => now(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}