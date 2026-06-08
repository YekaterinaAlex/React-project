import { describe, expect, it } from 'vitest';

import { imageToBase64 } from './imageToBase64';

describe('imageToBase64', () => {
  it('converts image file to base64 string', async () => {
    const file = new File(['hello'], 'test.png', {
      type: 'image/png',
    });

    const result = await imageToBase64(file);

    expect(result).toContain('data:image/png;base64,');
  });
});
