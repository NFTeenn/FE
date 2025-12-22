export default function TestPage() {
  const data: any = null;
  
  // null.property 접근으로 에러 발생
  return <div>{data.someProperty}</div>;
}