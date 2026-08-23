'use server';
/**
 * @fileOverview An AI graphology teaser agent that provides preliminary insights from a handwriting sample.
 *
 * - getGraphologyTeaser - A function that handles the graphology teaser process.
 * - AiGraphologyTeaserInput - The input type for the getGraphologyTeaser function.
 * - AiGraphologyTeaserOutput - The return type for the getGraphologyTeaser function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiGraphologyTeaserInputSchema = z.object({
  handwritingDataUri: z
    .string()
    .describe(
      "A handwriting sample image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AiGraphologyTeaserInput = z.infer<typeof AiGraphologyTeaserInputSchema>;

const AiGraphologyTeaserOutputSchema = z.object({
  insights: z
    .string()
    .describe(
      'Preliminary, indicative insights about potential personality traits or subconscious patterns based on the handwriting sample.'
    ),
});
export type AiGraphologyTeaserOutput = z.infer<typeof AiGraphologyTeaserOutputSchema>;

export async function getGraphologyTeaser(
  input: AiGraphologyTeaserInput
): Promise<AiGraphologyTeaserOutput> {
  return aiGraphologyTeaserFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiGraphologyTeaserPrompt',
  input: {schema: AiGraphologyTeaserInputSchema},
  output: {schema: AiGraphologyTeaserOutputSchema},
  prompt: `You are an advanced AI graphologist, designed to provide preliminary and indicative insights from handwriting samples.

Your goal is to offer a glimpse into potential personality traits, emotional tendencies, subconscious blocks, and hidden strengths as revealed by the provided handwriting. Frame these insights in a luxurious, encouraging, and sophisticated tone, designed to pique the user's interest in deeper self-discovery.

Analyze the following handwriting sample and provide a concise, engaging summary of preliminary observations. Do not claim to offer a full diagnosis or definitive analysis, but rather an intriguing teaser of what graphology can reveal.

Handwriting Sample: {{media url=handwritingDataUri}}`,
});

const aiGraphologyTeaserFlow = ai.defineFlow(
  {
    name: 'aiGraphologyTeaserFlow',
    inputSchema: AiGraphologyTeaserInputSchema,
    outputSchema: AiGraphologyTeaserOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
