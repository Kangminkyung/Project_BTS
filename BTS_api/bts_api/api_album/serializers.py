from rest_framework import serializers

from .models import Album, Genre, Music, Category


class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = ('track', 'name', 'is_title')


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ('id', 'thumbnail', 'title', 'created', 'category')


class AlbumDetailSerializer(serializers.ModelSerializer):
    genre = serializers.SerializerMethodField('get_genre')
    music_set = MusicSerializer(many=True, read_only=True)

    def get_genre(self, obj):
        return ','.join([x.keyword for x in obj.genre.all()])

    class Meta:
        model = Album
        fields = ('id', 'thumbnail', 'title', 'created', 'category', 'content', 'genre', 'music_set')


class AlbumGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('keyword', )


class AlbumCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('keyword',)


class AlbumCreateSerializer(serializers.ModelSerializer):
    genre = serializers.CharField(max_length=100)

    def create(self, validated_data):
        thumbnail = validated_data.get('thumbnail')
        title = validated_data.get('title')
        content = validated_data.get('content')
        created = validated_data.get('created')
        category = validated_data.get('category')

        album = Album.objects.create()
        for x in validated_data.get('genre').split(','):
            album.genre.add(Genre.objects.get(keyword=x.strip()))
        album.save()
        return album

    class Meta:
        model = Album
        fields = ('thumbnail', 'title', 'content', 'created', 'category', 'genre')
