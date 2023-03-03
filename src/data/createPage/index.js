export const handlerPyExampleQiskit = `from qiskit import *
from qfaas import Backend, RequestData, Utils

# Define sdk name
sdk = "qiskit"

# Pre-processing input data
def pre_process(input):
    data = RequestData(input, sdk)
    return data


# Generate Quantum Circuit
def generate_circuit(input):
    qr = QuantumRegister(input, "q")
    cr = ClassicalRegister(input, "cr")
    circuit = QuantumCircuit(qr, cr)
    circuit.h(qr)
    circuit.measure(qr, cr)
    return circuit


# Post-processing output data
def post_process(job):
    output = Utils.qrng_counts_post_process(job)
    return output


def handle(event, context):
    # 1. Pre-processing
    requestData = pre_process(event)
    # Jump to the post processing step if postProcessOnly is set to True
    if requestData.postProcessOnly:
        job = post_process(requestData)
    else:
        # 2. Generate Quantum Circuit
        qc = generate_circuit(requestData.input)

        # 3. Verify and get Backend information
        backend = Backend(requestData, qc)

        # 4. Submit job and wait up to 1 min for job to complete.
        job = backend.submit_job(qc)
        # 5. Post-process
        if job.jobResult:
            job = post_process(job)
            
    # 6. Generate response data and return to user
    response = Utils.generate_response(job)
    return response

`

export const handlerPyExampleQsharp = `import qsharp
from QSFaaS import GenerateRandomNumber
from qfaas import Backend, RequestData, Utils

# Define sdk name
sdk = "qsharp"

# Pre-processing input data
def pre_process(input):
    data = RequestData(input, sdk)
    return data


# Post-processing output data
def post_process(job):
    pass
    return job


def handle(event, context):
    # 1. Pre-processing
    requestData = pre_process(event)

    # 2. Generate Quantum Circuit
    qc = GenerateRandomNumber

    # 3. Verify and get Backend information
    backend = Backend(requestData, qc)

    # 4. Submit job and wait up to 1 min for job to complete.
    job = backend.submit_job(qc)

    # 5. Post-process
    if job.jobResult:
        job = post_process(job)
    response = Utils.generate_response(job)

    # 6. Send back the result
    return response
`

export const handlerPyExampleBraket = `from braket.circuits import Circuit
from qfaas import Backend, RequestData, Utils

# Define sdk name
sdk = "braket"

# Pre-processing input data
def pre_process(input):
    data = RequestData(input, sdk)
    return data


# Generate Quantum Circuit
def generate_circuit(input):
    circuit = Circuit().h(range(input))
    return circuit


# Post-processing output data
def post_process(job):
    output = Utils.qrng_counts_post_process(job)
    return output


def handle(event, context):
    # 1. Pre-processing
    requestData = pre_process(event)

    # 2. Generate Quantum Circuit
    qc = generate_circuit(requestData.input)

    # 3. Verify and get Backend information
    backend = Backend(requestData, qc)

    # 4. Submit job and wait up to 1 min for job to complete.
    job = backend.submit_job(qc)

    # 5. Post-process
    if job.jobResult:
        job = post_process(job)
    response = Utils.generate_response(job)

    # 6. Send back the result
    return response

`

export const handlerPyExampleCirq = `# from importlib import abc
import cirq
from qfaas import Backend, RequestData, Utils

# Define sdk name
sdk = "cirq"

# Pre-processing input data
def pre_process(input):
    data = RequestData(input, sdk)
    return data


# Generate Quantum Circuit
def generate_circuit(input):
    circuit = cirq.Circuit()
    qubit = [0 for x in range(input)]
    for i in range(0, input):
        qubit[i] = cirq.NamedQubit("q" + str(i))
        circuit.append(cirq.H(qubit[i]))
        circuit.append(cirq.measure(qubit[i]))
    return circuit


# Post-processing output data
def post_process(job):
    output = Utils.qrng_counts_post_process(job)
    return output


def handle(event, context):
    # 1. Pre-processing
    requestData = pre_process(event)

    # 2. Generate Quantum Circuit
    qc = generate_circuit(requestData.input)

    # 3. Verify and get Backend information
    backend = Backend(requestData, qc)

    # 4. Submit job and wait up to 1 min for job to complete.
    job = backend.submit_job(qc)

    # 5. Post-process
    if job.jobResult:
        job = post_process(job)
    response = Utils.generate_response(job)

    # 6. Send back the result
    return response
`

export const handlerQsExample = `namespace QSFaaS {
  open Microsoft.Quantum.Canon;
  open Microsoft.Quantum.Intrinsic;
  open Microsoft.Quantum.Math;
  open Microsoft.Quantum.Convert;
  open Microsoft.Quantum.Diagnostics;

  operation GenerateRandomNumber(input : Int) : Int {
      mutable randomBits = [];
      mutable randomNumber = 0;
      use qubits = Qubit[input];
      for qubit in qubits {
          H(qubit);
          set randomBits += [M(qubit)];
          Reset(qubit);
      }
      set randomNumber = ResultArrayAsInt(randomBits);
      return randomNumber;
  }
}`