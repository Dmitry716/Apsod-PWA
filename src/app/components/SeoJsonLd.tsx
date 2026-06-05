/**
 * Выводит JSON-LD (Schema.org) в head страницы.
 * Передайте один объект или массив объектов для нескольких схем.
 */
export default function SeoJsonLd({
  data,
}: {
  data: object | object[]
}) {
  const json =
    Array.isArray(data) ? data : [data]
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
