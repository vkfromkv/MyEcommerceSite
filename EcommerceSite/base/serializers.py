from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Order, OrderItem, ShippingAddress, Review

class UserSerializer(serializers.ModelSerializer):
    # Custom serializer fields defined using SerializerMethodField
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        # Returns the user ID
        return obj.id

    def get_isAdmin(self, obj):
        # Checks if the user is a staff member (admin)
        return obj.is_staff

    def get_name(self, obj):
        # Returns the user's first name; if not available, returns their email
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    # Adds a JWT token to the user serializer
    token = serializers.SerializerMethodField(read_only=True)

    class Meta(UserSerializer.Meta):
        # Inherits fields from UserSerializer and adds 'token'
        fields = UserSerializer.Meta.fields + ['token']

    def get_token(self, obj):
        # Generates a JWT token for the user
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'  # Serializes all fields of the Review model

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'  # Serializes all fields of the Product model

    def get_reviews(self, obj):
        # Retrieves and serializes all reviews related to the product
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'  # Serializes all fields of the ShippingAddress model

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'  # Serializes all fields of the OrderItem model

class OrderSerializer(serializers.ModelSerializer):
    # Custom serializer fields for order items, shipping address, and user
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'  # Serializes all fields of the Order model

    def get_orderItems(self, obj):
        # Retrieves and serializes all order items related to the order
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        # Tries to serialize the shipping address; returns False if not available
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        # Serializes the user associated with the order
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
