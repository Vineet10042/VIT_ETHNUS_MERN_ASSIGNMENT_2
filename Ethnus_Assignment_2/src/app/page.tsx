'use client';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {recommendMovie} from '@/ai/flows/movie-recommendation';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';

interface Movie {
  title: string;
  genre: string;
  description: string;
  imageUrl: string;
}

const movies: Movie[] = [
  {
    title: 'The Cinematic Adventure',
    genre: 'Adventure',
    description:
      'A thrilling adventure that takes you to uncharted territories. Filled with action and suspense.',
    imageUrl: 'https://picsum.photos/id/237/300/200',
  },
  {
    title: 'Romantic Getaway',
    genre: 'Romance',
    description:
      'A heartwarming story about love and destiny. Perfect for a cozy night in.',
    imageUrl: 'https://picsum.photos/id/238/300/200',
  },
  {
    title: 'Comedy Central',
    genre: 'Comedy',
    description: 'Laugh out loud with this hilarious comedy. Guaranteed to brighten your day.',
    imageUrl: 'https://picsum.photos/id/239/300/200',
  },
  {
    title: 'Action Packed',
    genre: 'Action',
    description: 'An adrenaline-pumping action film with breathtaking stunts and intense battles.',
    imageUrl: 'https://picsum.photos/id/240/300/200',
  },
  {
    title: 'Mystery Unfolds',
    genre: 'Mystery',
    description:
      'A gripping mystery that will keep you guessing until the very end. Unravel the secrets.',
    imageUrl: 'https://picsum.photos/id/241/300/200',
  },
  {
    title: 'Sci-Fi Vision',
    genre: 'Sci-Fi',
    description:
      'Explore the future with this visually stunning sci-fi masterpiece. A journey beyond imagination.',
    imageUrl: 'https://picsum.photos/id/242/300/200',
  },
];

export default function Home() {
  const [recommendedMovie, setRecommendedMovie] = useState<{
    title: string;
    genre: string;
    description: string;
  } | null>(null);
  const [reason, setReason] = useState<string | null>(null);

  useEffect(() => {
    const getRecommendation = async () => {
      const topPicks = ['Oppenheimer', 'Barbie'];
      const trendingFilms = ['Wonka', 'Aquaman and the Lost Kingdom'];
      try {
        const recommendation = await recommendMovie({
          availableMovies: movies.map(movie => ({
            title: movie.title,
            genre: movie.genre,
            description: movie.description,
          })),
          topPicks: topPicks,
          trendingFilms: trendingFilms,
        });

        setRecommendedMovie(recommendation.recommendedMovie);
        setReason(recommendation.reason);
      } catch (error: any) {
        console.error('Error getting movie recommendation:', error);
        setReason(`Failed to get movie recommendation: ${error.message}`);
      }
    };

    getRecommendation();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Available Movies</h2>
        <Carousel className="w-full max-w-5xl">
          <CarouselContent className="-ml-1 md:ml-0">
            {movies.map(movie => (
              <CarouselItem key={movie.title} className="md:basis-1/2 lg:basis-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle>{movie.title}</CardTitle>
                    <CardDescription>{movie.genre}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={movie.imageUrl}
                      alt={movie.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <p>{movie.description}</p>
                    <Button className="mt-4 accent">Book Tickets</Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">AI Movie Recommendation</h2>
        {recommendedMovie ? (
          <Card>
            <CardHeader>
              <CardTitle>{recommendedMovie.title}</CardTitle>
              <CardDescription>{recommendedMovie.genre}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{recommendedMovie.description}</p>
              <p>
                <strong>Reason:</strong> {reason}
              </p>
              <Button className="mt-4 accent">Book Tickets</Button>
            </CardContent>
          </Card>
        ) : (
          <p>Loading movie recommendation...</p>
        )}
      </section>
    </div>
  );
}
