export default function Item({ item }) {
  // 4. Local state
  const { id, title, price, image } = item;

  // 8.render
  return (
    <ul className="item">
      <li>Title: {title}</li>
      <li>Price: {price}</li>
      <li>Image: {image ? "Yes" : "No"} </li>
    </ul>
  );
}
