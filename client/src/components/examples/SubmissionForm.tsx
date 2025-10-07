import SubmissionForm from '../SubmissionForm';

export default function SubmissionFormExample() {
  return <SubmissionForm onSubmit={(data) => console.log('Submit:', data)} />;
}
