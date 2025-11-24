import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "Electronics", count: 156, color: "bg-chart-1" },
  { name: "Accessories", count: 89, color: "bg-chart-2" },
  { name: "Furniture", count: 45, color: "bg-chart-3" },
  { name: "Office Supplies", count: 234, color: "bg-chart-4" },
  { name: "Hardware", count: 67, color: "bg-chart-5" },
];

const Categories = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="text-muted-foreground mt-1">Manage product categories</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{category.name}</span>
                <div className={`h-3 w-3 rounded-full ${category.color}`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{category.count}</p>
                <Badge variant="secondary">items</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
