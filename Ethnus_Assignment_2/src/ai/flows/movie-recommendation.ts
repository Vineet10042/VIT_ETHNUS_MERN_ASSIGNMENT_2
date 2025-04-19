// src/ai/flows/movie-recommendation.ts
'use server';
/**
 * @fileOverview AI Movie Recommendation Flow.
 *
 * - recommendMovie - A function that recommends a movie based on trending films.
 * - RecommendMovieInput - The input type for the recommendMovie function.
 * - RecommendMovieOutput - The return type for the recommendMovie function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RecommendMovieInputSchema = z.object({
  availableMovies: z
    .array(
      z.object({
        title: z.string().describe('The title of the movie.'),
        genre: z.string().describe('The genre of the movie.'),
        description: z.string().describe('A short synopsis of the movie.'),
      })
    )
    .describe('A list of available movies to recommend from.'),
  topPicks: z.array(z.string()).describe('List of current top movie picks.'),
  trendingFilms: z.array(z.string()).describe('List of currently trending films.'),
});
export type RecommendMovieInput = z.infer<typeof RecommendMovieInputSchema>;

const RecommendMovieOutputSchema = z.object({
  recommendedMovie: z.object({
    title: z.string().describe('The title of the recommended movie.'),
    genre: z.string().describe('The genre of the recommended movie.'),
    description: z.string().describe('A short synopsis of the recommended movie.'),
  }).describe('The recommended movie object'),
  reason: z.string().describe('The reason why the movie was recommended.'),
});
export type RecommendMovieOutput = z.infer<typeof RecommendMovieOutputSchema>;

export async function recommendMovie(input: RecommendMovieInput): Promise<RecommendMovieOutput> {
  return recommendMovieFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendMoviePrompt',
  input: {
    schema: z.object({
      availableMovies: z
        .array(
          z.object({
            title: z.string().describe('The title of the movie.'),
            genre: z.string().describe('The genre of the movie.'),
            description: z.string().describe('A short synopsis of the movie.'),
          })
        )
        .describe('A list of available movies to recommend from.'),
      topPicks: z.array(z.string()).describe('List of current top movie picks.'),
      trendingFilms: z.array(z.string()).describe('List of currently trending films.'),
    }),
  },
  output: {
    schema: z.object({
      recommendedMovie: z.object({
        title: z.string().describe('The title of the recommended movie.'),
        genre: z.string().describe('The genre of the recommended movie.'),
        description: z.string().describe('A short synopsis of the recommended movie.'),
      }).describe('The recommended movie object'),
      reason: z.string().describe('The reason why the movie was recommended.'),
    }),
  },
  prompt: `Given the current top movie picks: {{{topPicks}}}, trending films: {{{trendingFilms}}}, and the list of available movies:

  Available Movies:
  {{#each availableMovies}}
  - Title: {{this.title}}, Genre: {{this.genre}}, Description: {{this.description}}
  {{/each}}

  Recommend one movie from the available movies for the user. Explain your reasoning for recommending the movie.
  `,
});

const recommendMovieFlow = ai.defineFlow<
  typeof RecommendMovieInputSchema,
  typeof RecommendMovieOutputSchema
>(
  {
    name: 'recommendMovieFlow',
    inputSchema: RecommendMovieInputSchema,
    outputSchema: RecommendMovieOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

