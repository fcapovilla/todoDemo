## TodoDemo

Exemple d'application single-page utilisant Laravel, Backbone et Marionette.

1. Installer les dépendances avec Composer

	 $ composer install

2. Créer une base de données sqlite et la remplir avec les commandes suivantes :

	 $ sqlite3 app/storage/production.sqlite ""

	 $ php artisan migrate

3. Ensuite, démarrer le serveur avec la commande suivante :

	 $ php artisan serve

4. Vous pouvez accéder à votre serveur avec l'url suivant :

	 http://localhost:8000

Vous pouvez éxécuter les tests Javascript en démarrant un serveur local avec la commande suivante et en accédant à l'url http://localhost:8000/specs/SpecRunner.html :

	 $ php -S localhost:8000
