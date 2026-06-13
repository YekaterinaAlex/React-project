import { downloadCSV } from './downloadCSV';

describe('downloadCSV', () => {
  it('creates and downloads CSV file', () => {
    const createObjectURLMock = vi.fn(() => 'blob:test-url');
    const revokeObjectURLMock = vi.fn();

    vi.stubGlobal('URL', {
      createObjectURL: createObjectURLMock,
      revokeObjectURL: revokeObjectURLMock,
    });

    const clickMock = vi.fn();

    vi.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      download: '',
      click: clickMock,
    } as unknown as HTMLAnchorElement);

    downloadCSV([
      {
        name: 'pikachu',
      },
    ]);

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:test-url');
  });
});
