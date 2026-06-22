import { NextResponse } from 'next/server';

import type { Item } from '../../../features/Home/home.type';

export async function POST(request: Request) {
  const items = (await request.json()) as Item[];

  const csv = ['name', ...items.map((item) => item.name)].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="selected-pokemon.csv"',
    },
  });
}
