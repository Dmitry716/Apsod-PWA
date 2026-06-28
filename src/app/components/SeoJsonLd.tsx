/**
 * Выводит JSON-LD (Schema.org) в head страницы.
 * Автоматически добавляет @context для отдельных схем.
 */
export default function SeoJsonLd({
  data,
}: {
  data: object | object[]
}) {
  const withContext = (item: object) => {
    if ('@context' in item || '@graph' in item) return item
    return { '@context': 'https://schema.org', ...item }
  }

  const json = (Array.isArray(data) ? data : [data]).map(withContext)

  return (
    <>
      {json.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
