import React from 'react';

export default function table(params) {
  return (
    <div>
      <table className="table table-striped table-hover">
        {params.children}
      </table>
    </div>
  );
}
