import itertools
import operator

ops = {
    '+': operator.add,
    '-': operator.sub,
    '*': operator.mul,
    '/': operator.truediv
}

def evaluate_expression(expr):
    try:
        return eval(expr)
    except ZeroDivisionError:
        return None

def add_parentheses(expression):
    a, op1, b, op2, c, op3, d = expression
    return [
        f"(({a} {op1} {b}) {op2} {c}) {op3} {d}",
        f"({a} {op1} ({b} {op2} {c})) {op3} {d}",
        f"({a} {op1} {b}) {op2} ({c} {op3} {d})",
        f"{a} {op1} (({b} {op2} {c}) {op3} {d})",
        f"{a} {op1} ({b} {op2} ({c} {op3} {d}))"
    ]

def find_24_solutions(numbers):
    solutions = set()
    for perm in itertools.permutations(numbers):
        for ops_seq in itertools.product(ops.keys(), repeat=3):
            expression = [str(perm[0]), ops_seq[0], str(perm[1]), ops_seq[1], str(perm[2]), ops_seq[2], str(perm[3])]
            for expr in add_parentheses(expression):
                if evaluate_expression(expr) == 24:
                    solutions.add(expr)
    return solutions

digits = '0123456789'
combinations = itertools.combinations(digits, 4)

results = []
for comb in combinations:
    solutions = find_24_solutions(list(map(int, comb)))
    if solutions:
        results.append({
            "number": ''.join(comb),
            "answers": list(solutions)
        })

from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/')
db = client['test']  
collection = db['answers']  
if results:
    collection.insert_many(results)

print("Data has been added to MongoDB.")
