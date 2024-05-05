const RESOURCES_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources';

export function getAvatarUrl(src: string | null | undefined) {
  return src ? `${RESOURCES_BASE_URL}${src}` : 'images/no-avatar.png';
}
