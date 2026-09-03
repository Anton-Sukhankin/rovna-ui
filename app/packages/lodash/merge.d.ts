declare function merge<TObject, TSource>(
  object: TObject,
  source: TSource,
): TObject & TSource;
declare function merge<TObject, TSource1, TSource2>(
  object: TObject,
  source1: TSource1,
  source2: TSource2,
): TObject & TSource1 & TSource2;
declare function merge(object: any, ...sources: any[]): any;

export = merge;
