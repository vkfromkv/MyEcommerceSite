from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Product(models.Model):
    """
    Represents an item within an order.

    Attributes:
        product (ForeignKey): The product ordered.
        order (ForeignKey): The order this item belongs to.
        name (CharField): The name of the product.
        qty (IntegerField): The quantity ordered.
        price (DecimalField): The price of the product.
        image (CharField): A URL or reference to an image of the product.
        _id (AutoField): The primary key; an auto-incrementing integer.
    """
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        """Returns the name of the product."""
        return self.name


class Review(models.Model):
    """
    Represents a product review.

    Attributes:
        product (ForeignKey): The product that this review is about.
        user (ForeignKey): The user who wrote the review.
        name (CharField): The name of the user (or a nickname).
        rating (IntegerField): The rating given by the user.
        comment (TextField): The review comment text.
        createdAt (DateTimeField): The date and time when the review was created.
        _id (AutoField): The primary key; an auto-incrementing integer.
    """
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        """Returns the review rating as a string."""
        return str(self.rating)


class Order(models.Model):
    """
    Represents an order placed by a user.

    Attributes:
        user (ForeignKey): The user who placed the order.
        paymentMethod (CharField): The payment method used for the order.
        taxPrice (DecimalField): The tax amount for the order.
        shippingPrice (DecimalField): The shipping cost for the order.
        totalPrice (DecimalField): The total price of the order.
        isPaid (BooleanField): Whether the order has been paid.
        paidAt (DateTimeField): The date and time when the order was paid.
        isDelivered (BooleanField): Whether the order has been delivered.
        deliveredAt (DateTimeField): The date and time when the order was delivered.
        createdAt (DateTimeField): The date and time when the order was created.
        _id (AutoField): The primary key; an auto-incrementing integer.
    """
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        """Returns the creation date of the order as a string."""
        return str(self.createdAt)


class OrderItem(models.Model):
    """
    Represents an item within an order.

    Attributes:
        product (ForeignKey): The product ordered.
        order (ForeignKey): The order this item belongs to.
        name (CharField): The name of the product.
        qty (IntegerField): The quantity ordered.
        price (DecimalField): The price of the product.
        image (CharField): A URL or reference to an image of the product.
        _id (AutoField): The primary key; an auto-incrementing integer.
    """
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        """Returns the name of the product."""
        return str(self.name)


class ShippingAddress(models.Model):
    """
    Represents a shipping address for an order.

    Attributes:
        order (OneToOneField): The order to which this address is linked.
        address (CharField): The street address.
        city (CharField): The city.
        postalCode (CharField): The postal code.
        country (CharField): The country.
        shippingPrice (DecimalField): The cost of shipping to this address.
        _id (AutoField): The primary key; an auto-incrementing integer.
    """
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        """Returns the shipping address."""
        return str(self.address)
