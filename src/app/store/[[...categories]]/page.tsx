interface CategoryProps {
  params: {
    categories: string[];
  };
  searchParams?: any;
}

export default function category(props: CategoryProps) {
  const { categories } = props.params;
  return (
    <main>
      <h1>Categoría dinámica: {categories} </h1>
    </main>
  );
}
